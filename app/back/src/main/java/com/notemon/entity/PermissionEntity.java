package com.notemon.entity;

import com.notemon.entity.annotation.AppUUIDGenerator;
import com.notemon.enums.PermissionEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.UUID;

@Entity
@Table(name = "PERMISSION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuppressWarnings("ALL")
public class PermissionEntity extends BaseEntity {
    @Id
    @Type(type = "uuid-char")
    @GeneratedValue(generator = "UUID")
    @AppUUIDGenerator
    @Column(name = "ID", updatable = false, nullable = false)
    @NotNull
    private UUID id;

    @Column(name = "CODE", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'VIEWER'")
    @NotNull
    private PermissionEnum code = PermissionEnum.VIEWER;

    @Column(name = "DESCRIPTION", nullable = true)
    private String description;
}
