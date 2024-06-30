import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableSortLabel, Checkbox } from '@mui/material';

function TablaModular({ data, columns, selected, onSelectAllClick, onSelectRowClick, onRowClick }) {
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const wrapCellStyles = {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    backgroundColor: '#161b22',
    padding: '16px 16px',
    fontSize: '1rem',
    color: '#f0f6fc',
  };

  console.log(data);

  const getCellValue = (row, field) => {
    const value = row[field];
    if (typeof value === 'object' && value !== null) {
      return value.nombre || JSON.stringify(value);
    }
    return value;
  };

  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#0d1117', width: '100%' }}>
      <Table size="small" aria-label="a dense table">
        <TableHead style={{ backgroundColor: '#161b22' }}>
          <TableRow>
            <TableCell padding="checkbox" style={{ color: '#f0f6fc', fontSize: '1rem' }}>
              <Checkbox
                color="primary"
                indeterminate={selected.length > 0 && selected.length < data.length}
                checked={data.length > 0 && selected.length === data.length}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all' }}
                style={{ color: '#f0f6fc' }}
              />
            </TableCell>
            {columns.map((col) => (
              <TableCell key={col.field} style={{ color: '#f0f6fc', fontSize: '1rem' }}>
                <TableSortLabel style={{ color: '#f0f6fc' }}>
                  {col.header}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            const isItemSelected = isSelected(row.id);
            return (
              <TableRow
                key={row.id}
                hover
                onClick={(event) => {
                  if (!event.target.closest('button') && !event.target.closest('input')) {
                    onRowClick(row);
                  }
                }}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                selected={isItemSelected}
                sx={{
                  cursor: 'pointer',
                  backgroundColor: isItemSelected ? '#21262d' : 'inherit',
                  transition: 'background-color 0.3s ease',
                  '&:hover': {
                    backgroundColor: '#2c3e50 !important',
                  },
                }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    onChange={(event) => {
                      event.stopPropagation();
                      onSelectRowClick(event, row.id);
                    }}
                    inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${row.id}` }}
                    style={{ color: '#f0f6fc' }}
                  />
                </TableCell>
                {columns.map((col) => (
                  <TableCell key={col.field} style={{ ...wrapCellStyles, maxWidth: '250px' }}>
                    {col.render ? col.render(null, row) : getCellValue(row, col.field)}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TablaModular.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    field: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    render: PropTypes.func,
  })).isRequired,
  selected: PropTypes.arrayOf(PropTypes.any).isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onSelectRowClick: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default TablaModular;
