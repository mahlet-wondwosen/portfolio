export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("toast", { detail: message }));
}

export async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast(`Copied: ${text}`);
  } catch {
    toast(text);
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
