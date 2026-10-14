type JsonLdNode = Record<string, unknown>;

export type JsonLdStubRegistry = Readonly<Record<string, JsonLdNode>>;

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

const JSONLD_CONTEXT = "https://schema.org";

function stripContext(node: JsonLdNode): JsonLdNode {
  const { ["@context"]: _context, ...withoutContext } = node;
  return withoutContext;
}

function collectIds(nodes: JsonLdNode[]): {
  definitions: Set<string>;
  references: Set<string>;
} {
  const definitions = new Set<string>();
  const references = new Set<string>();
  const visited = new WeakSet<object>();

  function visit(value: unknown): void {
    if (value === null || typeof value !== "object" || visited.has(value)) {
      return;
    }

    visited.add(value);

    if (Array.isArray(value)) {
      value.forEach(visit);
      return;
    }

    const object = value as JsonLdNode;
    const id = object["@id"];

    if (typeof id === "string") {
      if (Object.prototype.hasOwnProperty.call(object, "@type")) {
        definitions.add(id);
      }

      if (Object.keys(object).length === 1) {
        references.add(id);
      }
    }

    Object.values(object).forEach(visit);
  }

  nodes.forEach(visit);

  return { definitions, references };
}

function mergeTopLevelNodes(nodes: JsonLdNode[]): JsonLdNode[] {
  const merged: JsonLdNode[] = [];
  const positionsById = new Map<string, number>();

  for (const incomingNode of nodes) {
    const node = stripContext(incomingNode);
    const id = node["@id"];

    if (typeof id !== "string") {
      merged.push(node);
      continue;
    }

    const existingPosition = positionsById.get(id);

    if (existingPosition === undefined) {
      positionsById.set(id, merged.length);
      merged.push(node);
      continue;
    }

    if (
      Object.keys(node).length > Object.keys(merged[existingPosition]).length
    ) {
      merged[existingPosition] = node;
    }
  }

  return merged;
}

export function buildJsonLdGraph(
  nodes: readonly JsonLdNode[],
  pagePath: string,
  stubRegistry: JsonLdStubRegistry,
): JsonLdGraph {
  const graph = mergeTopLevelNodes([...nodes]);
  const attemptedStubIds = new Set<string>();

  while (true) {
    const { definitions, references } = collectIds(graph);
    const unresolvedReferences = [...references].filter(
      (id) => !definitions.has(id) && !attemptedStubIds.has(id),
    );

    if (unresolvedReferences.length === 0) {
      break;
    }

    let appendedStub = false;

    for (const id of unresolvedReferences) {
      attemptedStubIds.add(id);
      const stub = stubRegistry[id];

      if (
        stub &&
        Object.prototype.hasOwnProperty.call(stub, "@id") &&
        stub["@id"] === id
      ) {
        graph.push(stripContext(stub));
        appendedStub = true;
      }
    }

    if (!appendedStub) {
      break;
    }
  }

  const { definitions, references } = collectIds(graph);
  const unresolvedId = [...references].find((id) => !definitions.has(id));

  if (unresolvedId) {
    throw new Error(
      `Unresolved JSON-LD @id "${unresolvedId}" on page "${pagePath}". Add the node to the page schemas or extend the stub registry in src/config/seo.ts.`,
    );
  }

  return {
    "@context": JSONLD_CONTEXT,
    "@graph": graph,
  };
}
