import React, { Component } from 'react';

const Stateless = () => {
  const whiteListValues = [<div></div>, "", NaN, 0, null];
  const index = Math.floor(Math.random()*4)
  return whiteListValues[index];
}
const StatelessNotReturnNull = () => {
  const nonWhiteListValues = [{}, undefined, 0];
  const index = Math.floor(Math.random() * whiteListValues.length)
  return nonWhiteListValues;
}

const StatelessReturnDiv = () => {
  return <div></div>;
}

export {
  Stateless,
  StatelessNotReturnNull,
  StatelessReturnDiv
}