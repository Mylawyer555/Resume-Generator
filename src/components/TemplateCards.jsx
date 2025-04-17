import React from "react";
import { motion } from "framer-motion";

const TemplateCard = ({ template, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer relative group"
    >
      <img
        src={template.image}
        alt={template.name}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      <h3 className="text-xl font-semibold text-gray-800 mb-2">{template.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{template.description}</p>

      {/* Button is always visible on small screens, only animates on hover for md+ */}
      <motion.button
        onClick={() => onSelect(template)}
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        whileHover={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition 
                   absolute bottom-6 left-1/2 transform -translate-x-1/2 
                   opacity-100 md:opacity-0 md:group-hover:opacity-100"
      >
        Select Template
      </motion.button>
    </motion.div>
  );
};

export default TemplateCard;
