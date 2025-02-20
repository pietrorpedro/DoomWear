export const maskEmail = (email) => {
    return email.replace(/^(.{2}).*(@.*)$/, (_, start, domain) => {
        return start + "*".repeat(email.indexOf("@") - 2) + domain;
    });
}