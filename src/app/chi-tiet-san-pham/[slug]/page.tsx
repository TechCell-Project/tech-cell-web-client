import { CASE_PRODUCT_FETCH } from '@/constants';
import { RootPath } from '@/constants/enum';
import { extractIdFromSlug, getErrorMsg, getProductByIdCustom } from '@utils';

import NotFound from '@/components/Common/Display/NotFound';
import { ProductDetail } from '@/components/Common/Product/ProductDetail';

export default async function Page({ params }: Readonly<{ params: { slug: string } }>) {
    const idExtractedFromSlug = extractIdFromSlug(params.slug);

    const response = await getProductByIdCustom(idExtractedFromSlug);

    if (!response.product) {
        return (
            <NotFound
                description={getErrorMsg(response.status, CASE_PRODUCT_FETCH)}
                redirectTitle='Xem danh sách sản phẩm'
                redirect={RootPath.ProductList}
            />
        );
    }

    return <ProductDetail product={response.product} />;
}
