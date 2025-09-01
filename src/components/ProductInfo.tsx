
import { motion, AnimatePresence } from 'framer-motion';
import type { Product } from '../types';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: [0.215, 0.61, 0.355, 1] as const,
            duration: 0.4,
        },
    },
    exit: {
        y: -20,
        opacity: 0,
        transition: {
            ease: 'easeIn' as const,
            duration: 0.2,
        },
    },
};

const specsContainerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: [0.215, 0.61, 0.355, 1] as const,
            duration: 0.4,
            staggerChildren: 0.1,
        },
    },
    exit: {
        y: -20,
        opacity: 0,
        transition: {
            ease: 'easeIn' as const,
            duration: 0.2,
            staggerChildren: 0.05,
            staggerDirection: -1,
        },
    },
};

const specItemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            ease: [0.215, 0.61, 0.355, 1] as const,
            duration: 0.3,
        },
    },
    exit: {
        y: -10,
        opacity: 0,
        transition: {
            ease: 'easeIn' as const,
            duration: 0.15,
        },
    },
};

interface ProductInfoProps {
    product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={product.id}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <motion.h2
                    variants={itemVariants} 
                    className="text-6xl font-bold text-[#3A2F2F] leading-tight max-w-sm text-balance" 
                    dangerouslySetInnerHTML={{ __html: product.name.replace(/ /g, '<br/>')}}
                >
                </motion.h2>

                <motion.p variants={itemVariants} className="text-gray-500 mt-6 mb-8 max-w-sm text-balance">
                    {product.description}
                </motion.p>

                {product?.specs && product.specs.length > 0 && (
                    <motion.div variants={specsContainerVariants} className="flex items-center gap-3 flex-wrap max-w-sm">
                        {product.specs.map((spec, index) => (
                            <motion.span 
                                key={index}
                                variants={specItemVariants}
                                className={`py-2 px-5 rounded-full text-sm font-semibold ${
                                    index === 0 
                                    ? 'border border-gray-300 text-gray-800' 
                                    : 'bg-gray-100 text-gray-800'
                                }`}
                            >
                                {spec}
                            </motion.span>
                        ))}
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductInfo;