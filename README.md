# Getting Started with Data Visualization Dashboard

This project is a data visualization dashboard that displays tabular data, provides filtering and searching functionalities, and visualizes the data using pie charts and bar charts.

## Installation

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the project directory:

   cd project-directory

3. Install dependencies:

   npm install

## Running the Application

To run the application locally:

1. Start the development server:
   npm start
2. Open your browser and navigate to `http://localhost:3000`.

## Components Overview

### GridTable Component

The `GridTable` component displays tabular data with pagination, filtering, and searching functionalities.

- **Pagination**: Navigate through multiple pages of data.
- **Filtering**: Filter data by various attributes such as zone, device brand, vehicle brand, etc.
- **Searching**: Search for specific data entries by username.

### Chart Component

The `Chart` component visualizes data using pie charts and bar charts.

- **Pie Charts**: Visualize distribution of device brand, vehicle brand, and vehicle CC.
- **Bar Charts**: Visualize distribution of device brand and vehicle brand.

### API Integration Component

This component handles API requests to fetch and manipulate data for the `GridTable` and `Chart` components.

## Interacting with Components

### GridTable Component

- **Pagination**: Use the pagination controls at the bottom of the table to navigate between pages.
- **Filtering**: Select filter options from the dropdown menu to filter data by specific attributes.
- **Searching**: Enter search queries in the search input field to find specific data entries.

### Chart Component

- **Interpretation**: Analyze the visualizations to gain insights into the distribution of device brand, vehicle brand, and vehicle CC.

## Error Handling

Errors, if any, will be displayed on the UI along with instructions on how to proceed. Please follow the provided instructions in case of errors.
