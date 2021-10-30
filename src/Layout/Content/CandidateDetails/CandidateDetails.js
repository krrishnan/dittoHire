import React from "react";
import CandidateClasses from './CandidateDetails.module.css';
import {
	TableContainer,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell
} from '@mui/material';
import { FaSort } from "react-icons/fa";


const CandidateDetails = (props) => {
	const CandidateList = props.candidateList;

	const candidatesWithValidRoleCount = CandidateList.reduce(
		(count, candidate) => {
			if (candidate.role !== '') return count + 1;
			return count;
		}, 0
	);
	const interViewRequestCountText = `${candidatesWithValidRoleCount} Interview Requests`;
	const interViewRequestCountElement = (
		<div className={CandidateClasses.InterViewRequestCount}>
			{interViewRequestCountText}
		</div>
	);

	//Table headers
	const columnNames = [
		{ name: 'Candidate', data: 'candidate' },
		{ name: 'Role', data: 'role' },
		{ name: 'Last Communication', data: 'last_comms', sortable: true },
		{ name: 'Salary', data: 'salary' },
		{ name: 'Sent by', data: 'sent_by' },
		{ name: '', data: 'archived' }
	];
	const columnHeaders = columnNames.map(
		(column, index) => {
			const columnName = column.name;
			const sortable = column.sortable;

			let headerElement = null;

			if (sortable === true) {
				headerElement = (
					<TableCell key={columnName + index}
						className={CandidateClasses.SortableHeader}
						onClick={() => props.handleSort(columnName)}
					>
						{columnName}
						<FaSort className={CandidateClasses.SortIcon} />
					</TableCell>
				);
			} else {
				headerElement = (
					<TableCell key={columnName + index}
						className={CandidateClasses.Header}
					>
						{columnName}
					</TableCell>
				)
			}

			return headerElement;
		}
	);

	//Table Content
	const candidateData = CandidateList.map(
		(candidateData, index, candidateList) => {
			if (getShowCandidate(candidateData, props.searchText, props.showArchived)) {
				return generateCandidateRow(candidateData, index, candidateList, props);
			} else {
				return null;
			}
		}
	);


	return (
		<div className={CandidateClasses.CandidateDetail}>
			{interViewRequestCountElement}

			<TableContainer className={CandidateClasses.CandidateTableContainer}>
				<Table className={CandidateClasses.CandidateTable} sx={{ 'width': '80% ' }}>

					<TableHead>
						<TableRow>
							{columnHeaders}
						</TableRow>
					</TableHead>

					<TableBody>
						{candidateData}
					</TableBody>

				</Table>
			</TableContainer>
		</div>
	);
}

const getShowCandidate = (candidate, searchText, showArchived) => {
	const isFilteredData = candidate.candidate.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) >= 0;
	const isArchivedData = !(candidate.archived);
	return showArchived ? isFilteredData : (isFilteredData && isArchivedData);

}

const generateCandidateRow = (candidate, index, candidateList, props) => {
	const candidateName = candidate.candidate;
	const candidateImage = candidate.image;
	const candidateRole = candidate.role;
	const lastCommunication = candidate.last_comms.description + '  ' + getLastCommunicationTime(candidate.last_comms.date_time);
	const msgUnRead = candidate.last_comms.unread;
	const salary = candidate.salary;
	const sentBy = candidate.sent_by;
	const archived = candidate.archived ? 'unArchive' : 'archive';
	return (
		<TableRow key={candidateName + index}>
			<TableCell>
				<img src={candidateImage} alt={candidateName}
					className={CandidateClasses.CandidateImage}
				/>
				<span style={{ verticalAlign: '-webkit-baseline-middle' }} >
					{candidateName}
				</span>
			</TableCell>
			<TableCell> {candidateRole} </TableCell>
			<TableCell>
				{msgUnRead ? <div className={CandidateClasses.MessageNotRead} /> : null}
				<span>{lastCommunication}</span>
			</TableCell>
			<TableCell> {salary} </TableCell>
			<TableCell> {sentBy} </TableCell>
			<TableCell align="right">
				<button
					className={CandidateClasses.ArchiveButton}
					onClick={() => toggleArchiveButtonClickHandler(candidateList, candidate, index, props.updateCandiateArchivedStatus)}
				>
					{archived}
				</button>
			</TableCell>
		</TableRow>
	);
}

const toggleArchiveButtonClickHandler = (candidateList, candidate, index, updateCandiateArchivedStatus) => {
	const updatedCandidateList = [...candidateList];
	const updatedCandidate = { ...candidate };
	updatedCandidate.archived = !(updatedCandidate.archived);
	updatedCandidateList[index] = updatedCandidate;
	updateCandiateArchivedStatus(updatedCandidateList)
}

const getLastCommunicationTime = (dateTimeString) => {
	const currentTime = new Date();
	const dateTime = new Date(dateTimeString);

	const timeDifference = Math.abs(currentTime.getTime() - dateTime.getTime());
	const timeDifferenceInDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

	let lastCommunicationTime = null;
	if (!Number.isNaN(dateTime)) {
		if (timeDifferenceInDays > 1) {
			lastCommunicationTime = currentTime.toLocaleDateString();
		} else if (timeDifferenceInDays === 1) {
			lastCommunicationTime = 'yesterday';
		} else {
			lastCommunicationTime = dateTime.toLocaleTimeString([], { hour12: true, hour: '2-digit', minute: '2-digit' });
		}
	} else {
		lastCommunicationTime = null;
	}

	return lastCommunicationTime;
}

export default CandidateDetails;