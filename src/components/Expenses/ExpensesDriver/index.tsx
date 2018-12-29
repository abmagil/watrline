import {sankey, sankeyJustify, SankeyNode} from 'd3-sankey';
import React from 'react';
import {
  cloneDeep,
  filter,
  sortBy,
  partialRight
} from 'lodash';

const sortNodes = partialRight(sortBy, 'name')
const sortLinks = partialRight(sortBy, 'source.name')

interface DriverChildProps {
  nodes: any;
  links: any;
  width: number;
  height: number;
}

interface DriverProps {
  width: number;
  height: number;
  nodes: any;
  links: any;
  children: (props: DriverChildProps) => JSX.Element;
}

class ExpensesDriver extends React.Component<DriverProps> {
  sankeyGraph: any;
  
  constructor(props: DriverProps) {
    super(props);
    this.sankeyGraph = this.buildSankeyGenerator();
  }

  buildSankeyGenerator = () => {
    return sankey()
      .nodeWidth(15)
      .nodeId((d: SankeyNode<any, any>) => (d.name))
      .nodeAlign(sankeyJustify)
      .nodePadding(10)
      .size([this.props.width - 1, this.props.height - 6]);
  }

  componentWillReceiveProps() {
    this.sankeyGraph = this.buildSankeyGenerator();
  }

  filterFn = (o: any) => parseInt(o.value, 10) > 0;

  render() {
    const sortedNodes = sortNodes(this.props.nodes);
    const sortedLinks = sortLinks(this.props.links);
    
    const {nodes, links} = this.sankeyGraph({
      nodes: cloneDeep(sortedNodes),
      links: cloneDeep(filter(sortedLinks, this.filterFn))
    });
    
    return (this.props.children({nodes, links, width: this.props.width, height: this.props.height}))
  }   
}

export default ExpensesDriver;
