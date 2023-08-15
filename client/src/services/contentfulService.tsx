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
  skip?: number;
  limit?: number;
  fetchItems?: boolean;
  query?: any;
};

export const fetchFields = async ({
  contentType,
  slug,
  skip,
  limit,
  fetchItems,
  query,
}: fetchFieldsType): Promise<any> => {
  try {
    let queryObject: any = {
      include: 10,
      content_type: contentType,
      skip: skip,
      limit: limit,
    };
    if (query) {
      Object.keys(query).map((key) => {
        queryObject[key] = query[key];
      });
    }
    let response = await client.getEntries<any>(queryObject);
    if (fetchItems) {
      return response;
    } else {
      return response?.items.map((item: Entry<any>) => item.fields) || [];
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
};

type fetchFieldsBySysIdType = {
  id: string;
};
export const fetchFieldsBySysId = async ({
  id,
}: fetchFieldsBySysIdType): Promise<any[]> => {
  try {
    const response = await client.getEntries<any>({
      "sys.id": id,
    });
    return response?.items.map((item: Entry<any>) => item.fields) || [];
  } catch (error) {
    console.error("Error fetching content:", error);
    return [];
  }
};
