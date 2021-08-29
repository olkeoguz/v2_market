import styles from './Pagination.module.css';

import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Pagination = ({ numPerPage, totalNum, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalNum / numPerPage); i++) {
    pageNumbers.push(i);
  }

  if (pageNumbers[pageNumbers.length - 8]) {
    pageNumbers.splice(4, pageNumbers.length - 8, '...');
  }

  return (
    <div className={styles.Pagination}>
      {currentPage !== 1 && (
        <button onClick={() => paginate(currentPage - 1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>Prev</span>
        </button>
      )}
      <ul className={styles.paginationList}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === currentPage
                ? `${styles.pageNum} ${styles.active}`
                : styles.pageNum
            }
            onClick={() => paginate(number)}
          >
            <span
              className={number === '...' ? styles.disabled : styles.pageLink}
            >
              {number}
            </span>
          </li>
        ))}
      </ul>
      {currentPage !== Math.floor(totalNum / numPerPage + 1) && (
        <button onClick={() => paginate(currentPage + 1)}>
          <span>Next</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      )}
    </div>
  );
};

export default Pagination;
