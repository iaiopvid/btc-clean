export class StringSanitizer {
  static sanitize(input: string): string {
    return encodeURI(
      input
        .normalize('NFD')
        .replace(/[\ -\-]/g, '-')
        .replace(/[^a-zA-Z0-9\.\-]/g, ''),
    );
  }
}
