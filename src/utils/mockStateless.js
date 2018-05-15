import React, { Component } from 'react';

export const Stateless = () => {
  const whiteListValues = [<div></div>, "", NaN, 0, null];
  const index = Math.floor(Math.random()*4)
  return whiteListValues[index];
}
export const StatelessNotReturnNull = () => {
  const nonWhiteListValues = [{}, undefined, 0];
  const index = Math.floor(Math.random() * whiteListValues.length)
  return nonWhiteListValues;
}

export const StatelessReturnDiv = () => {
  return <div></div>;
}