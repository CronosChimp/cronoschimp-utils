export function arweaveUrl(url: string): string {
  return url.replace('ar://', 'https://arweave.net/')
}