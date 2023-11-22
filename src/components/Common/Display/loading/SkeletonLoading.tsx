import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonLoading(props: Readonly<SkeletonProps>) {
    return <Skeleton {...props} />;
}
