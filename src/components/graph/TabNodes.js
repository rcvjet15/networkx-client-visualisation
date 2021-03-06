import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import * as constants from '../../constants/appConstants';

const TabNodes = ({ nodes, onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked, centrality, shouldClickTableTrigger, handleTableChange }) => {
	const rowEvents = setRowEvents(onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked);

	return (
		<Row>
			<BootstrapTable keyField="id"
				data={nodes}
				columns={setColumns()}
				pagination={paginationFactory(setPaginationOptions())}
				filter={filterFactory()}
				rowEvents={rowEvents}
				selectRow={shouldClickTableTrigger && setSelectRow()}
				striped
				hover
				condensed />
		</Row>
	);
}

function setColumns() {
	return [{
		dataField: 'id',
		text: 'Id',
		sort: true,
		filter: textFilter()
	}, {
		dataField: 'original',
		text: 'Original',
		sort: true,
		filter: textFilter()
	}, {
		dataField: 'degreeCentrality',
		text: 'Degree Centrality',
		sort: true
	}, {
		dataField: 'betweennessCentrality',
		text: 'Betwenness Centrality',
		sort: true
	}, {
		dataField: 'pagerank',
		text: 'Pagerank',
		sort: true
	}, {
		dataField: 'wordType',
		text: 'Word Type',
		sort: true
	}];
}

function setRowEvents(onTableRowMouseOver, onTableRowMouseLeave, onTableRowClicked) {
	return {
		onClick: (e) => {
			onTableRowClicked(e);
		},
		onMouseOver: (e) => {
			onTableRowMouseOver(e);
		},
		onMouseLeave: (e) => {
			onTableRowMouseLeave(e);
		}
	}
}

function setSelectRow() {
	return {
		mode: 'checkbox',
		clickToSelect: true,
		style: { backgroundColor: '#c8e6c9' },
		onChange: () => console.log('Clicked')
	};
}

// eslint-disable-next-line
function setDefaultSort(centrality) {
	let centralityType;
	switch (centrality) {
		case constants.CENTRALITY.DegreeCentrality:
			centralityType = 'degreeCentrality';
			break;
		case constants.CENTRALITY.BetweennessCentrality:
			centralityType = 'betweennessCentrality';
			break;
		case constants.CENTRALITY.Pagerank:
			centralityType = 'pagerank';
			break;
		default:
			break;
	}

	return [{
		dataField: centralityType,
		order: 'desc'
	}];
}

function setPaginationOptions() {
	return {
		paginationSize: 4,
		sizePerPageList: [{
			text: '7', value: 7
		}],
		hideSizePerPage: true, // Hide the sizePerPage dropdown always
		hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
	};
}

TabNodes.propTypes = {
	nodes: PropTypes.array.isRequired,
	onTableRowMouseOver: PropTypes.func.isRequired,
	onTableRowMouseLeave: PropTypes.func.isRequired,
	onTableRowClicked: PropTypes.func.isRequired,
	centrality: PropTypes.string.isRequired,
	shouldClickTableTrigger: PropTypes.bool.isRequired
};

export default TabNodes;
