import type { GetStaticPaths } from "astro";
import { SITE_CONFIG } from "@/config/site";
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
    site: SITE_CONFIG.url,
    link: `/servicios/${props.service.slug}`,
  });
};