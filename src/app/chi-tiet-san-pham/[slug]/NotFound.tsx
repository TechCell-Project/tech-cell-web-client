import React from 'react';
import { RootPath } from '@/constants/enum';

const NotFound = () => {
    return (
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <h4>Không tìm thấy sản phẩm</h4>
            <h5>
                <a href={RootPath.Home}>Trang chủ</a>
            </h5>
        </div>
    );
};

export default NotFound;
