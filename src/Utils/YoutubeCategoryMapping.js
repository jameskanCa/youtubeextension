export class YoutubeCategoryMapping {
	static getYoutubeCategoryText(number) {
		switch (number) {
			case 1:
				return 'Film & Animation';
			case 2:
				return 'Autos & Vehicles';
			case 10:
				return 'Music';
			case 15:
				return 'Pets & Animals';
			case 17:
				return 'Sports';
			case 18:
				return 'Short Movies';
			case 19:
				return 'Travel & Events';
			case 20:
				return 'Gaming';
			case 21:
				return 'Videoblogging';
			case 22:
				return 'People & Blogs';
			case 23:
				return 'Comedy';
			case 24:
				return 'Entertainment';
			case 25:
				return 'News & Politics';
			case 26:
				return 'Howto & Styles';
			case 27:
				return 'Education';
			case 28:
				return 'Science & Technology';
			case 29:
				return 'Nonprofits & Activism';
			case 30:
				return 'Movies';
			case 31:
				return 'Anime / Animation';
			case 32:
				return 'Action / Adventure';
			case 33:
				return 'Classics';
			case 34:
				return 'Comedy';
			case 35:
				return 'Documentary';
			case 36:
				return 'Drama';
			case 37:
				return 'Family';
			case 38:
				return 'Foreign';
			case 39:
				return 'Horror';
			case 40:
				return 'Sci - Fi / Fantasy';
			case 41:
				return 'Thriller';
			case 42:
				return 'Shorts';
			case 43:
				return 'Shows';
			case 44:
				return 'Trailers';
			default:
				return 'Unknown';
		}
	}

	static isProcastinationVideo(category) {
		if (
			category === 1 ||
			category === 2 ||
			category === 10 ||
			category === 15 ||
			category === 17 ||
			category === 18 ||
			category === 19 ||
			category === 20 ||
			category === 23 ||
			category === 24 ||
			category === 25 ||
			category === 29 ||
			category === 30 ||
			category === 31 ||
			category === 32 ||
			category === 33 ||
			category === 34 ||
			category === 36 ||
			category === 37 ||
			category === 39 ||
			category === 40 ||
			category === 41 ||
			category === 42 ||
			category === 43 ||
			category === 44
		) {
			return true;
		} else {
			return false;
		}
	}
}
