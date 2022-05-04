package com.notemon.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@MappedSuperclass
@Getter
@Setter
public abstract class AbstractEntity implements Serializable {
    @Column(name = "USR_LOG_I", nullable = false)
    @NotNull
    private Integer userLogInserted;

    @Column(name = "DTE_LOG_I", nullable = false)
    @NotNull
    private String dateLogInserted;

    @Column(name = "USR_LOG_U", nullable = false)
    @NotNull
    private Integer userLogUpdated;

    @Column(name = "DTE_LOG_U", nullable = false)
    @NotNull
    private String dateLogUpdated;

    @Column(name = "ENTITY_VERSION", nullable = false, columnDefinition = "int default 0")
    @NotNull
    private int entityVersion = 0;

    @Transient
    private boolean transientHashCodeLeaked = false;

    public abstract Long getId();

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

        AbstractEntity that = (AbstractEntity) o;

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
