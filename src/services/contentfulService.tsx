import { createClient, Entry } from "contentful";

const cntfSpace = process.env.REACT_APP_CONTENTFUL_SPACE_ID || "";
const cntfToken = process.env.REACT_APP_CONTENTFUL_PREVIEW_TOKEN
  ? process.env.REACT_APP_CONTENTFUL_PREVIEW_TOKEN
  : process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN || "";
const cntfHost = process.env.NEXT_PUBLIC_CONTENTFUL_HOST || "";

const client = createClient({
  space: cntfSpace,
  accessToken: cntfToken,
  host: cntfHost,
});

type fetchFieldsType = {
  contentType: string;
  slug?: string;
};

export const fetchFields = async ({
  contentType,
  slug,
}: fetchFieldsType): Promise<any[]> => {
  try {
    let response;
    if (slug) {
      response = await client.getEntries<any>({
        include: 5,
        content_type: contentType,
        "fields.slug": slug,
      });
    } else {
      response = await client.getEntries<any>({
        include: 5,
        content_type: contentType,
      });
    }
    return response?.items.map((item: Entry<any>) => item.fields) || [];
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
};
