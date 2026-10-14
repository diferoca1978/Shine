import type { GetStaticPaths } from "astro";
import { llmsService } from "@/utils/llms";
import { services, type Service } from "@/config/services";

export const getStaticPaths: GetStaticPaths = async () => {
  return services.map((service) => ({
    params: { slug: service.slug },
    props: { service },
  }));
};

export const GET = ({ props }: { props: { service: Service } }) => {
  return llmsService({
    service: props.service,
    link: `/servicios/${props.service.slug}`,
  });
};
