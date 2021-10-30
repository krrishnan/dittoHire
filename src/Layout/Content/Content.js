import React, { useState } from "react";
import ContentClasses from './Content.module.css';
import { CandidateList } from '../../Store/CandidateList';
import CandidateDetails from "./CandidateDetails/CandidateDetails";
import CandidateHeader from './CandidateHeader/CandidateHeader';

const invertSortOrder = {
	asc: 'desc',
	desc: 'asc'
}

const Content = () => {
	const [candidateList, setCandidateList] = useState(CandidateList);
	const [searchText, setSearchText] = useState('');
	const [showArchived, setShowArchived] = useState(true);
	const [sortData, setSortData] = useState({ columnName: null, sortOrder: null });



	const handleSort = (columnName) => {
		const lastSortedColumnName = sortData.columnName;
		const sortOrder = sortData.sortOrder;

		if (lastSortedColumnName === null || lastSortedColumnName === undefined) {
			const newColumnName = columnName;
			const newSortOrder = 'asc';
			const newSortData = { columnName: newColumnName, sortOrder: newSortOrder };
			setSortData(newSortData);
			sortCandidateList(newColumnName, newSortOrder, candidateList, setCandidateList);
		} else {
			const newColumnName = columnName;
			const newSortOrder = invertSortOrder[sortOrder];
			const newSortData = { columnName: newColumnName, sortOrder: newSortOrder };
			setSortData(newSortData);
			sortCandidateList(newColumnName, newSortOrder, candidateList, setCandidateList);
		}

	}

	return (
		<div className={ContentClasses.Content}>
			<CandidateHeader
				searchText={searchText}
				showArchived={showArchived}
				showArchivedChanged={setShowArchived}
				searchTextChanged={setSearchText} />
			<CandidateDetails
				searchText={searchText}
				showArchived={showArchived}
				updateCandiateArchivedStatus={setCandidateList}
				handleSort={handleSort}
				candidateList={candidateList} />
		</div>
	);
}

const sortCandidateList = (columnName, sortOrder, candidateList, setCandidateList) => {
	//logic handled only for last communication

	let sortedCandidateList;

	if (sortOrder.indexOf('desc') >= 0) {
		sortedCandidateList = candidateList.sort(sortDesc);
	} else if (sortOrder.indexOf('asc') >= 0) {
		sortedCandidateList = candidateList.sort(sortAsc);
	}
}

const sortAsc = (a, b) => {
	const aDate = new Date(a.last_comms.date_time);
	const bDate = new Date(b.last_comms.date_time);

	return aDate - bDate;
}
const sortDesc = (a, b) => {
	const aDate = new Date(a.last_comms.date_time);
	const bDate = new Date(b.last_comms.date_time);
	
	return bDate - aDate;
}


export default Content;