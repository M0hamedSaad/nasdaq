import React from 'react';
import { ViewProps, View as RNView } from 'react-native';

const View = (props: ViewProps) => {
  return <RNView {...props}>{props.children}</RNView>;
};

export default View;
