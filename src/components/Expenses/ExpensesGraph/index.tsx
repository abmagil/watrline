import { format } from 'd3-format';
import { sankeyLinkHorizontal} from 'd3-sankey';
import {select, Selection } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import { transition } from 'd3-transition';
import 'd3-transition';
import React from 'react';
import {findDOMNode} from 'react-dom';
import { schemeCategory10 } from 'd3-scale-chromatic';


interface ExpensesProps {
  height: number;
  width: number;
  links: any;
  nodes: any;
}

export default class Expenses extends React.Component<ExpensesProps> {
  formatNumber: (n: number | { valueOf(): number; }) => string;
  formatNum: (d: any) => string;
  color: any;
  svg: any;
  link: any;
  node: any;

  constructor(props: ExpensesProps) {
    super(props);
    this.formatNumber = format(",.0f")
    this.formatNum = function(d: any) { return `$${this.formatNumber(d)}`; }
    this.color = scaleOrdinal(schemeCategory10);
  }

  nodeEnter = (node: any) => {
    node.append("rect");
    node.append("text");
    node.append("title");
  }

  nodeUpdate = (node: any) => {
    node.select("rect")
      // .transition(this.transition)
      .attr("x", function(d: any) { return d.x0; })
      .attr("y", function(d: any) { return d.y0; })
      .attr("height", function(d: any) { return d.y1 - d.y0; })
      .attr("width", function(d: any) { return d.x1 - d.x0; })
      .attr("fill", (d: any) => { return this.color(d.name.replace(/ .*/, "")); })
      .attr("stroke", "#000");
      
    node.select("text")
      // .transition(this.transition)
      .attr("x", function(d: any) { return d.x0 - 6; })
      .attr("y", function(d: any) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function(d: any) { return d.name; })
      .filter((d: any) => { return d.x0 < this.props.width / 2; })
      .attr("x", function(d: any) { return d.x1 + 6; })
      .attr("text-anchor", "start");
      
    node.select("title")
      .text(function(d: any) { return d.name + "\n" + format(d.value); });
  }

  linkEnter = (link: any) => {
    link.append("title")
      .text((d: any) => (`${d.source.name} → ${d.target.name}\n${this.formatNum(d.value)}`));
  }

  linkUpdate = (link: any) => {
    link
      // .transition(this.transition)
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke-width', (d: any) => (Math.max(1, d.width)));
  }

  linkKeyFn = (link: any) => {
    return `${link.source.name}->${link.target.name}`;
  }

  transition = (selection: any) => {
    return transition(selection)
      .duration(750);
  }

  componentDidMount() {
    const svgDomNode: Element = findDOMNode(this) as Element;
    this.svg = select(svgDomNode);
    const svg = this.svg;
    
    this.link = svg.append("g")
        .attr("class", "links")
        .attr("fill", "none")
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.2)
      .selectAll("path")
        .data(this.props.links, this.linkKeyFn);

    this.link.enter()
      .append("path")
        .call(this.linkEnter)
      .merge(this.link)
        .call(this.linkUpdate);

    this.node = svg.append("g")
        .attr("class", "nodes")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("g")
        .data(this.props.nodes, (node: any) => (node.name));

    this.node.enter().append("g")
      .call(this.nodeEnter)
    .merge(this.node)
        .call(this.nodeUpdate);
  }
  
  componentDidUpdate(_prevProps: ExpensesProps, _prevState: ExpensesProps) {
    this.link = select("g.links").selectAll("path")
      .data(this.props.links, this.linkKeyFn);
    this.link.exit().remove();
    this.link.enter()
      .append('path').call(this.linkEnter)
    .merge(this.link)
      .call(this.linkUpdate);

    this.node = select("g.nodes").selectAll("g")
      .data(this.props.nodes, (node: any) => (node.name))
      .order();
    this.node.exit().remove();
    this.node.enter()
      .append("g").call(this.nodeEnter)
    .merge(this.node)
      .call(this.nodeUpdate);
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>
      </svg>
    )
  }
}
