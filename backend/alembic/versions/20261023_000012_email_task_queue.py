"""add durable email task queue

Revision ID: 20261023_000012
Revises: 20260405_000011
Create Date: 2026-10-23 00:00:00
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "20261023_000012"
down_revision: Union[str, None] = "20260405_000011"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "email_tasks",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("recipient", sa.String(length=255), nullable=False),
        sa.Column("encrypted_code", sa.Text(), nullable=False),
        sa.Column("code_hash", sa.String(length=64), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="queued"),
        sa.Column("attempts", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("available_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.Column("locked_until", sa.DateTime(timezone=True), nullable=True),
        sa.Column("last_error", sa.String(length=500), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_email_tasks_recipient", "email_tasks", ["recipient"], unique=False)
    op.create_index("ix_email_tasks_status", "email_tasks", ["status"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_email_tasks_status", table_name="email_tasks")
    op.drop_index("ix_email_tasks_recipient", table_name="email_tasks")
    op.drop_table("email_tasks")