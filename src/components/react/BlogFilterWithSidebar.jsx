import { useEffect, useState } from "react";

const BlogFilterWithSidebar = ({ posts, initialTag = "all" }) => {
	const [currentTag, setCurrentTag] = useState(initialTag);
	const [filteredPosts, setFilteredPosts] = useState(posts);

	// Get unique tags from all posts
	const allTags = ["all"];
	const tagSet = new Set();
	posts.forEach((post) => {
		post.tags?.forEach((tag) => tagSet.add(tag.toLowerCase()));
	});
	const tags = [...allTags, ...Array.from(tagSet).sort()];

	useEffect(() => {
		// Read tag from URL on mount
		const urlParams = new URLSearchParams(window.location.search);
		const tagFromUrl = urlParams.get("tag")?.toLowerCase() || "all";
		setCurrentTag(tagFromUrl);
	}, []);

	useEffect(() => {
		// Filter posts based on current tag
		if (currentTag === "all") {
			setFilteredPosts(posts);
		} else {
			setFilteredPosts(
				posts.filter((post) =>
					post.tags?.some((tag) => tag.toLowerCase() === currentTag)
				)
			);
		}
	}, [currentTag, posts]);

	const handleTagClick = (tag) => {
		setCurrentTag(tag);

		// Update URL without page reload
		const url = new URL(window.location);
		if (tag === "all") {
			url.searchParams.delete("tag");
		} else {
			url.searchParams.set("tag", tag);
		}
		window.history.pushState({}, "", url);
	};

	const formatDate = (date) => {
		return new Intl.DateTimeFormat("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		}).format(new Date(date));
	};

	const formatDateShort = (date) => {
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			year: "numeric",
		}).format(new Date(date));
	};

	return (
		<>
			{/* Sidebar - only visible on desktop */}
			{filteredPosts.length > 0 && (
				<div className="blog-sidebar-container">
					<h2 className="blog-sidebar-title">All Posts</h2>
					<nav className="blog-sidebar-nav">
						<ul className="blog-sidebar-list">
							{filteredPosts.map((post) => (
								<li key={post.slug} className="blog-sidebar-item">
									<a href={`/blog/${post.slug}/`} className="blog-sidebar-link">
										<span className="blog-sidebar-link-title">{post.title}</span>
										<span className="blog-sidebar-link-meta">
											{formatDateShort(post.pubDate)}
											{post.tags && post.tags.length > 0 && ` · ${post.tags[0]}`}
										</span>
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			)}

			{/* Main Content */}
			<div className="blog-content-area">
				{/* Tag Filter */}
				<div className="tag-filter-buttons">
					{tags.map((tag) => (
						<button
							key={tag}
							onClick={() => handleTagClick(tag)}
							className={`tag-filter-btn ${
								currentTag === tag ? "tag-filter-btn--active" : ""
							}`}
							type="button"
						>
							{tag}
						</button>
					))}
				</div>

				{/* Blog List */}
				<div className="blog-posts-list">
					{filteredPosts.length > 0 ? (
						filteredPosts.map((post) => (
							<article key={post.slug} className="blog-post-card">
								<h2>
									<a href={`/blog/${post.slug}/`}>{post.title}</a>
								</h2>
								<p className="blog-post-meta">
									{formatDate(post.pubDate)}
									{post.tags && post.tags.length > 0 && ` · ${post.tags.join(", ")}`}
								</p>
								{post.description && <p className="blog-post-excerpt">{post.description}</p>}
							</article>
						))
					) : (
						<p className="empty-state">No posts with this tag yet.</p>
					)}
				</div>
			</div>
		</>
	);
};

export default BlogFilterWithSidebar;
