import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
//import process from "node:os"

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_PROJECT_DATASET,
    apiVersion: process.env.REACT_APP_SANITY_PROJECT_API_VERSION,
    token: process.env.REACT_APP_SANITY_PROJECT_API_TOKEN,
    useCdn: true,
});

const imgBuilder = imageUrlBuilder(client)

export const getImgUrlFrom = (source) => {
    if (source)
        return imgBuilder.image(source);
    return null;
}
