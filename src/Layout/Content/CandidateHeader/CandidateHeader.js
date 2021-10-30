import React from "react";
import CandidateHeaderClasses from './CandidateHeader.module.css';
import { FaSearch } from "react-icons/fa";

const CandidateHeader = (props) => {

	const searchTextChangedHandler = (searchTextChangeEvent) => {
		props.searchTextChanged(searchTextChangeEvent.target.value);
	}
	const showArchivedChangeHandler = (showArchivedChangeEvent) => {
		props.showArchivedChanged(showArchivedChangeEvent.target.checked);
	}

	return (
		<div className={CandidateHeaderClasses.CandidateHeader}>
			<div className={CandidateHeaderClasses.SearchContainer}>
				<input type="text" placeholder="Search"
					value={props.searchText}
					onChange={searchTextChangedHandler} />
				<button>
					<FaSearch className={CandidateHeaderClasses.Icon} />
				</button>
			</div>

			<div className={CandidateHeaderClasses.ArchiveContainer}>
				<span>Show archived</span>
				<input type='checkbox'
					checked={props.showArchived}
					onChange={showArchivedChangeHandler} />
			</div>

		</div>
	);
}

export default CandidateHeader;