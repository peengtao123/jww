package com.jww.common.redis.util;

import com.jww.common.redis.manager.CacheManager;

/**
 * @author shadj
 * @description: TODO
 * @date 2017/11/21 16:35
 */
public class CacheUtil {

    private static CacheManager cacheManager;

    public static void setCacheManager(CacheManager cacheManager) {
        CacheUtil.cacheManager = cacheManager;
    }

    public static CacheManager getCache() {
        return cacheManager;
    }
}