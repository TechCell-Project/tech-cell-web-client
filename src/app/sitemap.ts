import { MetadataRoute } from 'next';
import { getProductsPublic } from '@services';
import { PagingProduct } from '@models';
import { RootPath } from '@constants/enum';
import { BASE_URL } from '@constants';
import { convertSlugUrl } from '@utils';

type Sitemap = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}>;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getProductsPublic({ ...new PagingProduct(), pageSize: 10 });
    const productUrls =
        products.data.data.map((product) => {
            return {
                url: `${BASE_URL}${RootPath.ProductDetails}/${convertSlugUrl(
                    product.name as string,
                )}-${product._id}.html`,
                lastModified: new Date(),
                changeFrequency: 'daily',
            };
        }) ?? [];

    const commonUrls = [RootPath.Home, RootPath.ProductList].map((url) => {
        return {
            url: BASE_URL + url,
            lastModified: new Date(),
            changeFrequency: 'daily',
        };
    });

    return [...(commonUrls as Sitemap), ...(productUrls as Sitemap)];
}
