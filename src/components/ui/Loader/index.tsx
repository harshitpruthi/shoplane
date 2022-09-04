import './loader.css';

import React from 'react';

import cn from 'classnames';

export const LOADER_TYPE = {
  LINEAR: 'linear'
} as const;


export class Loader extends React.PureComponent<DefaultProps, {}> {
  static defaultProps: DefaultProps;


  render() {
    return this.getLinearLoaderUI();
  }


  getLinearLoaderUI = () => {
    const containerClasses = this.getContainerClassName('loader14Linear');

    return (
      <div className={containerClasses}>
        <div className="loader14Indeterminate" />
      </div>
    );
  }


  getContainerClassName = (defaultClass = '') => {
    const { active } = this.props;

    return cn({
      'loader': true,
      'loader14Active': active,
      'loader14Hidden': !active
    }, defaultClass);
  }


  getLoaderClassName = (defaultClass = '') => {
    const { dimension, loaderClassName } = this.props;

    return cn({
      [ `loader14${dimension}` ]: !!dimension
    }, [ 'loader14Inner', defaultClass, loaderClassName ]);
  }

}


Loader.defaultProps = {
  loaderClassName: '',
  active: true,
  dimension: '60px',
  borderWidth: '2px'
};


export type DefaultProps = {
  loaderClassName: string;
  active: boolean;
  dimension: string;
  borderWidth: string | number;
}

export default Loader;