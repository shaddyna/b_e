// lib/chat-permissions.ts
export function canChatWithUser(currentUserRole: string, otherUserRole: string): boolean {
  // Admins can chat with anyone
  if (currentUserRole === "admin") {
    return true;
  }
  
  // Customers can only chat with admins
  if (currentUserRole === "customer") {
    return otherUserRole === "admin";
  }
  
  return false;
}