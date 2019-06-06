import React, { Fragment, FunctionComponent } from 'react';
import { Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

import { IState } from '../../store/reducers';
import './Loader.scss';


interface IAppProps {
  isLoading: boolean;
}

const Loader: FunctionComponent<IAppProps> = (props) => {
  return (
    <Fragment>
      {props.isLoading && (<div className="loader"><Spinner animation="border" /></div>)}
    </Fragment>
  );
};

const mapStateToProps = (state: IState) => ({ isLoading: state.pokemonPreview.isLoading });

export default connect(
  mapStateToProps,
)(Loader);
