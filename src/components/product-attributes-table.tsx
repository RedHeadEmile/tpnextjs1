import {ProductRating} from "tp-kit/components";
import styles from "./product-attributes-table.module.css"

export type ProductAttribute = {
    label: string,
    rating: number
}

export interface ProductAttributesTableProps {
    attributes: ProductAttribute[]
}

export function ProductAttributesTable({ attributes }: ProductAttributesTableProps) {
    return <table className={styles.table}>
        <tbody>
        {attributes.map((attr, i) =>
        <tr key={i}>
            <td>{attr.label}</td>
            <td className={"flex justify-end"}><ProductRating value={attr.rating} icon={"circle"} /></td>
        </tr>)}
        </tbody>
    </table>
}