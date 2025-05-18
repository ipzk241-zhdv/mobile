import api from "./api";

export const fetchPosts = async () => {
    // 1. Получаем всех пользователей
    const usersRes = await api.get("/users.json");
    const users = usersRes.data || {};

    // 2. Собираем мапу userId → { name, lastname }
    const authorsMap = Object.entries(users).reduce((map, [uid, userData]) => {
        map[uid] = {
            name: userData.name || "",
            lastname: userData.lastname || "",
        };
        return map;
    }, {});

    // 3. Для каждого пользователя вытягиваем его посты
    const postPromises = Object.entries(users).map(async ([userId]) => {
        try {
            const postsRes = await api.get(`/users/${userId}/posts.json`);
            const posts = postsRes.data || {};
            return Object.entries(posts).map(([postId, post]) => ({
                id: postId,
                userId,
                authorName: authorsMap[userId].name,
                authorLastname: authorsMap[userId].lastname,
                ...post,
            }));
        } catch (err) {
            console.error(`Failed to load posts for user ${userId}:`, err);
            return [];
        }
    });

    const allPostsNested = await Promise.all(postPromises);
    return allPostsNested.flat();
};

export const createPost = async (userId, post) => {
    const res = await api.post(`/users/${userId}/posts.json`, post);
    return res.data.name;
};

export const updatePost = async (userId, postId, updates) => {
    await api.patch(`/users/${userId}/posts/${postId}.json`, updates);
};

export const deletePost = async (userId, postId) => {
    await api.delete(`/users/${userId}/posts/${postId}.json`);
};
