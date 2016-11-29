import 'react-native';
import React from 'react';
import AppIos from '../build/index.ios.js';
import AppAndroid from '../build/index.android.js';

// Note: test renderer must be required after react-native.
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