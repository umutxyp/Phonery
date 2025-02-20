
# Phonery - Phone Number Extractor

Phonery is a simple and efficient Electron application designed to extract phone numbers from Excel files. It allows users to filter phone numbers based on prefixes and download the extracted numbers in a `.txt` format.

## Features

- **Excel File Processing**: Select or drag Excel files (.xlsx, .xls) to extract phone numbers.
- **Prefix Filtering**: Filter phone numbers based on specified prefixes.
- **Phone Number Extraction**: Extracts phone numbers from multiple sheets of Excel files.
- **Cross-Platform**: Built with Electron, it works on Windows, macOS, and Linux.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/umutxyp/phonery.git
    cd phonery
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Build and package the app:

    ```bash
    npm run package
    ```

4. To start the app in development mode:

    ```bash
    npm start
    ```

## Usage

- **Open the app**: When the app is opened, drag and drop Excel files or click to select files.
- **Set Prefixes**: Enter the phone number prefixes (separated by commas) to filter the extracted phone numbers.
- **Download Results**: After the extraction is done, you can download the list of phone numbers in a `.txt` format.

## File Processing Flow

1. Users can select multiple files or drag them into the application.
2. The files are processed, and phone numbers are filtered based on the provided prefixes.
3. After the process completes, the extracted phone numbers are displayed.
4. Users can download the phone numbers as a `.txt` file.

## Technologies

- **Electron**: For creating a cross-platform desktop application.
- **TailwindCSS**: For modern and responsive design.
- **xlsx**: For reading and processing Excel files.

## Development

To start the development server:

```bash
npm start
```

To package the app:

```bash
npm run package
```

## License

MIT License. See the [LICENSE](LICENSE) file for more details.

---

**Producer**: [umutxyp](https://github.com/umutxyp) | Powered by [codeshare.me](https://codeshare.me)
