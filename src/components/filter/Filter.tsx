import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectAsync from 'react-select';

import { IPokemonFilterState } from '../../store/filter/reducer';
import { loadTypes, setFilter } from '../../store/filter/actions';
import { IPokemonTypeAPIResource } from '../../interfaces/pokemons.interface';


export interface IAppProps {
  filter: IPokemonFilterState;
  loadTypes: () => void;
  setFilter: (types: IPokemonTypeAPIResource) => void;
}

class Filter extends Component<IAppProps> {
  state = {
    selectedOption: null,
  }

  componentDidMount() {
    this.props.loadTypes();
  }

  handleChange = (selectedOption: any) => {
    this.setState({ selectedOption });
    // this.props.setFilter(selectedOption && { name: selectedOption.label, url: selectedOption.value });
  }

  render() {
    const { filter } = this.props;
    const { selectedOption } = this.state;
    const options = filter.typeList.map(o => ({ value: o.url, label: o.name }));
    return (
      <SelectAsync
        isLoading={filter.isLoading}
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        isClearable={true}
      />
    );
  }
}

const mapStateToProps = ({ filter }: { filter: IPokemonFilterState }) => ({ filter });
const mapDispatchToProps = { loadTypes, setFilter };

export default connect(mapStateToProps, mapDispatchToProps)(Filter);