import React from 'react';
import PriceDetails from './PriceDetails';

const PriceDetailsSelector = ({ accion, fillData }) => {
  if (accion === "sale") {
    return <PriceDetails type="Sale" fillData={fillData} />;
  }
  if (accion === "rent") {
    return <PriceDetails type="Rent" fillData={fillData} />;
  }
  if (accion === "both") {
    return <PriceDetails type="Both" fillData={fillData} />;
  }
  return null;
};

export default PriceDetailsSelector;
