package com.jww.ump.model;

import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableName;
import com.jww.common.core.base.BaseModel;
import lombok.Data;

/**
 * <p>
 * 用户授权表
 * </p>
 *
 * @author wanyong
 * @since 2017-11-29
 */
@Data
@TableName("sys_user_menu")
public class SysUserMenuModel extends BaseModel {

    private static final long serialVersionUID = 1L;

    @TableField("user_id")
    private Long userId;
    @TableField("menu_id")
    private Long menuId;
    /**
     * 权限标识
     */
    @TableField("permission_")
    private String permission;
}
