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

RPE chart JSON files can store metadata such as the creator, difficulty, and chart name, but this is **not recommended**. Doing so may duplicate information that is already recorded elsewhere and lead to inconsistencies. Phira uses `info.yml` as the source of truth.
