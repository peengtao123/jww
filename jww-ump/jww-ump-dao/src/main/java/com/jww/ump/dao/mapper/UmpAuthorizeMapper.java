package com.jww.ump.dao.mapper;

import com.jww.ump.model.UmpMenuModel;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 使用一段文字进行描述
 *
 * @author waner
 * @create 2017-11-29
 **/
public interface UmpAuthorizeMapper {
    List<String> selectPermissionByUserId(@Param("userId") Long userId);
}
