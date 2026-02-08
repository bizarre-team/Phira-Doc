# Phira Chart Standard

## Basic Chart Structure

A Phira chart package is a zip file. After extraction, the root of the zip should contain the following files directly (not in subfolders):

- `info.yml`: [Chart Info](./chartinfo) file in YAML format
- Other files as specified in `info.yml`

## Supported Files

### Chart Files

See [Chart File Formats](./chart-format/).

### Music Files

See [Music File Format](./music).

TBD

## FAQ

RPE's chart JSON file stores metadata (creator, difficulty, name, etc.), which is **discouraged** as this can lead to duplicate recording of this information, causing inconsistencies. Phira's behavior is based on `info.yml`.
