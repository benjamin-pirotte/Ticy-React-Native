import ReactNative from 'react-native';
import React from 'react';
import AppIos from '../build/index.ios.js';
import AppAndroid from '../build/index.android.js';
import renderer from 'react-test-renderer';

it('Ios renders correctly', () => {
  const tree = renderer.create(
    <AppIos />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Android renders correctly', () => {
  const tree = renderer.create(
    <AppAndroid />
  ).toJSON(); 
  expect(tree).toMatchSnapshot();
});
