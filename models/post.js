import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Posts = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        liked: {
            type: Array,
            default: [],
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
    },
    {timestamps: true},
);

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *      id:
 *        type: string
 *      name:
 *        type: string
 *      description:
 *        type: string
 *      price:
 *        type: number
 *      category:
 *        type: string
 *      sold:
 *        type: number
 *      images:
 *        type: array
 *        items:
 *         type: string
 *      shipping:
 *        type: boolean
 *      color:
 *        type: string
 *      brand:
 *        type: string
 *    required:
 *     - name
 *     - description
 *     - price
 *    example:
 *      id: _fdakfakhfa
 *      name: Product A
 *      description: Mo ta san pham
 *      price: 200
 */

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: API dành cho Product
 */

export default mongoose.model('posts', Posts);
