class UserResource {
    /**
     * Formats a single user object for the API response.
     * Hides sensitive information like passwords.
     */
    static make(user) {
        if (!user) return null;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
    }

    /**
     * Formats an array of user objects.
     */
    static collection(users) {
        if (!Array.isArray(users)) return [];
        return users.map(user => this.make(user));
    }
}

module.exports = UserResource;
