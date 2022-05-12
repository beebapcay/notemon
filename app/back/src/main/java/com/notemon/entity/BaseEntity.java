package com.notemon.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@MappedSuperclass
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public abstract class BaseEntity implements Serializable {
    @Column(name = "USR_LOG_I", nullable = false)
    @NotNull
    @CreatedBy
    private String userLogInserted;

    @Column(name = "DTE_LOG_I", nullable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    @NotNull
    @CreatedDate
    private LocalDateTime dateLogInserted;

    @Column(name = "USR_LOG_U", nullable = false)
    @NotNull
    @LastModifiedBy
    private String userLogUpdated;

    @Column(name = "DTE_LOG_U", nullable = false, columnDefinition = "TIMESTAMP DEFAULT now()")
    @NotNull
    @LastModifiedDate
    private LocalDateTime dateLogUpdated;

    @Column(name = "VERSION", nullable = false, columnDefinition = "INT DEFAULT 0")
    @NotNull
    @Version
    private int version = 0;

    @Transient
    private boolean transientHashCodeLeaked = false;

    public abstract UUID getId();

    @Override
    public String toString() {
        return getClass().getSimpleName() + "(id=" + getId() + ")";
    }

    public boolean isPersisted() {
        return getId() != null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BaseEntity that = (BaseEntity) o;

        if (isPersisted() && that.isPersisted()) {
            return getId().equals(that.getId());
        }
        return false;
    }

    @Override
    public int hashCode() {
        if (!isPersisted()) {
            transientHashCodeLeaked = true;
            return super.hashCode();
        }

        if (transientHashCodeLeaked) {
            return super.hashCode();
        }

        return getId() != null ? getId().hashCode() : super.hashCode();
    }
}
