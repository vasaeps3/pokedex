import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectAsync from 'react-select';

import { INamedAPIResource } from '../../interfaces/base.interface';
import { loadTypes, setFilter } from '../../store/filter/actions';
import { IPokemonFilterState } from '../../store/filter/reducer';


export interface IAppProps {
  filter: IPokemonFilterState;
  loadTypes: () => void;
  setFilter: (types: INamedAPIResource) => void;
  disabled: boolean;
}

class Filter extends Component<IAppProps> {
  public state = {
    selectedOption: null,
  };

  public componentDidMount() {
    this.props.loadTypes();
  }

  public handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    this.props.setFilter(selectedOption);
  }

  public render() {
    const { filter } = this.props;
    const { selectedOption } = this.state;
    const options = filter.typeList.map((o) => ({
      ...o,
      value: o.url,
      label: o.title,
    }));
    return (
      <SelectAsync
        isLoading={filter.isLoading}
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        isClearable={true}
        isDisabled={this.props.disabled}
      />
    );
  }
}


const mapStateToProps = ({ filter }: { filter: IPokemonFilterState }) => ({ filter });
const mapDispatchToProps = {
  loadTypes,
  setFilter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filter);
