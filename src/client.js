/* eslint-disable no-undef */
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: process.env.REACT_APP_SANITY_PROJECT_DATASET,
    apiVersion: process.env.REACT_APP_SANITY_PROJECT_API_VERSION,
    useCdn: true,
});

const imgBuilder = imageUrlBuilder(client)

export const getImgUrlFrom = (source) => {
    if (source)
        return imgBuilder.image(source);
    return null;
}
