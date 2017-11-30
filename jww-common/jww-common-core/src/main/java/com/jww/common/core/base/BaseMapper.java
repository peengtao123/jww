package com.jww.common.core.base;

import com.jww.common.core.base.BaseModel;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import java.util.List;
import java.util.Map;

/**
 * @author wanyong
 * @description: TODO
 * @date 2017/11/12 11:54
 */
public interface BaseMapper<T extends BaseModel> extends com.baomidou.mybatisplus.mapper.BaseMapper<T> {

    List<Long> selectIdPage(@Param("cm") Map<String, Object> params);

    List<Long> selectIdPage(RowBounds rowBounds, @Param("cm") Map<String, Object> params);

}