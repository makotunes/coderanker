CREATE TABLE `allowance_configs` (
	`id` text PRIMARY KEY NOT NULL,
	`employment_type` text NOT NULL,
	`allowance` integer NOT NULL,
	`effective_month` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `allowance_type_month_idx` ON `allowance_configs` (`employment_type`,`effective_month`);--> statement-breakpoint
CREATE TABLE `base_salary_configs` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`tier` text NOT NULL,
	`base_salary` integer NOT NULL,
	`effective_month` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `base_salary_role_tier_month_idx` ON `base_salary_configs` (`role`,`tier`,`effective_month`);--> statement-breakpoint
CREATE TABLE `evaluations` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`week` text NOT NULL,
	`month` text NOT NULL,
	`half` text NOT NULL,
	`evaluation_type` text DEFAULT 'weekly' NOT NULL,
	`quality_score` real,
	`quantity_points` real,
	`satisfaction_score` real,
	`total_points` real,
	`process_quality_score` real,
	`consistency_score` real,
	`completed_projects` integer,
	`salary` integer,
	`trend` text,
	`requirement_coverage` real,
	`test_coverage` real,
	`senior_review_score` real,
	`ai_cross_evaluation` real,
	`commit_quality` real,
	`process_consistency` real,
	`development_rhythm` real,
	`problem_solving_approach` real,
	`function_fp` integer,
	`added_lines` integer,
	`deleted_lines` integer,
	`commit_count` integer,
	`requirement_alignment` real,
	`process_quality` real,
	`business_value` real,
	`usability` real,
	`penalty_points` real,
	`penalty_rate` real,
	`penalty_reason` text,
	`bonus_points` integer,
	`bonus_reason` text,
	`comments` text,
	`process_metrics` blob,
	`recent_projects` blob,
	`evaluation_history` blob,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `evaluations_user_week_idx` ON `evaluations` (`user_id`,`week`);--> statement-breakpoint
CREATE TABLE `incentive_configs` (
	`id` text PRIMARY KEY NOT NULL,
	`role` text NOT NULL,
	`min_incentive` integer NOT NULL,
	`max_incentive` integer NOT NULL,
	`effective_month` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `incentive_configs_effective_month_role_unique` ON `incentive_configs` (`effective_month`,`role`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`name` text NOT NULL,
	`role` text NOT NULL,
	`tier` text NOT NULL,
	`monthly_salary` integer NOT NULL,
	`employment_type` text DEFAULT 'Employee' NOT NULL,
	`profile` blob,
	`retired_at` text,
	`capability_manager_id` text,
	`project_manager_id` text,
	`skill` text,
	`joining_date` text,
	`is_reference_salary` integer,
	`fte` real,
	`is_evaluated` integer,
	`title` text,
	`department` text,
	`number` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE TABLE `weekly_pre_evaluations` (
	`id` text PRIMARY KEY NOT NULL,
	`evaluator_id` text NOT NULL,
	`evaluatee_id` text NOT NULL,
	`week` text NOT NULL,
	`evaluation_type` text NOT NULL,
	`evaluator_role` text NOT NULL,
	`quality_score` real,
	`requirement_coverage` real,
	`test_coverage` real,
	`senior_review_score` real,
	`ai_cross_evaluation` real,
	`quantity_points` real,
	`commit_quality` real,
	`process_consistency` real,
	`development_rhythm` real,
	`problem_solving_approach` real,
	`function_fp` integer,
	`added_lines` integer,
	`deleted_lines` integer,
	`commit_count` integer,
	`satisfaction_score` real,
	`requirement_alignment` real,
	`process_quality` real,
	`business_value` real,
	`usability` real,
	`penalty_points` real,
	`penalty_rate` real,
	`penalty_reason` text,
	`bonus_points` integer,
	`bonus_reason` text,
	`comments` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`due_date` text NOT NULL,
	`completed_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `weekly_pre_evaluations_evaluator_evaluatee_week_type_idx` ON `weekly_pre_evaluations` (`evaluator_id`,`evaluatee_id`,`week`,`evaluation_type`);